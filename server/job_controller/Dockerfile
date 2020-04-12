FROM python:buster

WORKDIR /app

RUN mkdir secrets/

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS /app/secrets/TheCut-5b433024b0c1.json                                                                                                  

EXPOSE 5001

CMD ["python3", "job_controller.py"]