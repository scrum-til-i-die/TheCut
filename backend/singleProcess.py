# python3 singleProcess.py
from google.cloud import vision_v1


def singleProcess(imagePath):
    client = vision_v1.ImageAnnotatorClient()

    response = client.annotate_image(
        {
            'image': {'source': {'image_uri': imagePath}},
            'features': [{'type': vision_v1.enums.Feature.Type.WEB_DETECTION}]
        }
    )

    output = response.web_detection.web_entities

    # print(response)
    print('...web detections:')
    for d in output:
        if d.description:
            print(d.description)

    return output

# singleProcess('gs://the-cut-test-bucket/frame-0.jpg')