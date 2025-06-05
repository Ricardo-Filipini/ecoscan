import { createClient } from '@google/cloud-vision';

const API_KEY = 'AIzaSyAHWJqOAhVaPsddNBsZU7Emp3XGTBLaZaI';

async function analyzeImage(imageUrl: string) {
  try {
    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              source: {
                imageUri: imageUrl,
              },
            },
            features: [
              {
                type: 'OBJECT_LOCALIZATION',
                maxResults: 5,
              },
              {
                type: 'LABEL_DETECTION',
                maxResults: 5,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return new Response('Image URL is required', { status: 400 });
    }

    const result = await analyzeImage(imageUrl);
    
    // Process the results to determine waste category
    const labels = result.responses[0].labelAnnotations || [];
    const objects = result.responses[0].localizedObjectAnnotations || [];
    
    // Combine all detected items
    const allDetections = [...labels, ...objects].map(item => item.description || item.name);
    
    // Simple classification logic based on keywords
    let category: string = 'general';
    let confidence = 0.7; // Default confidence

    const categoryKeywords = {
      recyclable: ['plastic', 'glass', 'metal', 'paper', 'cardboard', 'bottle', 'can'],
      compost: ['food', 'plant', 'fruit', 'vegetable', 'organic', 'leaf'],
      electronic: ['electronic', 'device', 'phone', 'computer', 'battery', 'cable'],
      hazardous: ['chemical', 'paint', 'oil', 'battery', 'medicine', 'toxic'],
    };

    for (const detection of allDetections) {
      const lowerDetection = detection.toLowerCase();
      
      for (const [cat, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => lowerDetection.includes(keyword))) {
          category = cat;
          // Use the highest confidence score from the API
          confidence = Math.max(confidence, labels[0]?.score || objects[0]?.score || 0.7);
          break;
        }
      }
    }

    return Response.json({
      category,
      confidence,
      detectedObjects: allDetections,
    });
  } catch (error) {
    console.error('Error in analyze API:', error);
    return new Response('Error analyzing image', { status: 500 });
  }
}
