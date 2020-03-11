FROM python:buster

WORKDIR /app

RUN mkdir secrets/

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python", "job_controller.py"]