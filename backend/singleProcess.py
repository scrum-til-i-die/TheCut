from google.cloud import vision_v1
from collections import defaultdict


def singleProcess():
    dict = defaultdict(lambda: 0)
    client = vision_v1.ImageAnnotatorClient()

    imagePaths = [
        'gs://the-cut-test-bucket/frame-0.jpg',
        'gs://the-cut-test-bucket/frame-200.jpg',
        'gs://the-cut-test-bucket/frame-400.jpg',
        'gs://the-cut-test-bucket/frame-600.jpg',
        'gs://the-cut-test-bucket/frame-800.jpg'
    ]

    for i in range(5):
        response = client.annotate_image(
            {
                'image': {'source': {'image_uri': imagePaths[i]}},
                'features': [{'type': vision_v1.enums.Feature.Type.WEB_DETECTION}]
            }
        )

        output = response.web_detection.web_entities
        for d in output:
            if d.description:
                dict[d.description] += 1

    print ("THE MOVIE IS: ", max(dict, key=dict.get))
    return output


# singleProcess()
