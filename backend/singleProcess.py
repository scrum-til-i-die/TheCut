# python3 singleProcess.py
from google.cloud import vision_v1
client = vision_v1.ImageAnnotatorClient()

response = client.annotate_image(
    {
        'image': {'source': {'image_uri': 'gs://the-cut-test-bucket/poop.png'}},
        'features': [{'type': vision_v1.enums.Feature.Type.WEB_DETECTION}]
    }
)

output = response.web_detection.web_entities

# print(response)
print('Web detections:')
for d in output:
  if d.description:
    print(d.description)
