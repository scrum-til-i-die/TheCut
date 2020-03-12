FROM python:buster

WORKDIR /app

RUN mkdir secrets/

COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python3", "job_controller.py"]