import os
from configparser import ConfigParser
from mysql.connector import MySQLConnection


class DbConnect():
    global my_db
    global my_cursor
    
#################################################### Configuration
    filename = '/app/secrets/config.ini'
    section = 'mysql'
    parser = ConfigParser()
    parser.read(filename)

    if not (os.path.exists(filename)):
        raise Exception ('{0} cannot be acessed because it does not exist.'.format(filename))

    db = {}
    if parser.has_section(section):
        items = parser.items(section)
        for item in items:
            db[item[0]] = item[1]
    else:
        raise Exception('{0} not found in the {1} file'.format(section, filename))

    db_config = db

    my_db = MySQLConnection(**db_config)
    my_cursor = my_db.cursor()

####################################################

    @classmethod
    def create_job(cls, jobId, status, created_on):
        sql = "INSERT INTO Jobs (job_id, status, created_on) VALUES (%s, %s, %s)"
        val = (jobId, status, created_on)

        my_cursor.execute(sql, val)
        my_db.commit()
    
    @classmethod 
    def job_complete(cls, jobId, status, finished_on, movie_id = None, error= None):
        sql = "UPDATE Jobs Set status = %s, finished_on = %s, movie_id = %s, error_message = %s WHERE job_id = %s"
        val = (status, finished_on, movie_id, error, jobId)

        my_cursor.execute(sql, val)
        my_db.commit()

    @classmethod
    def get_job(cls, jobId):
        sql = "SELECT job_id, status, movie_id, error_message, created_on, finished_on FROM Jobs WHERE job_id = %s"
        val = (jobId,)

        my_cursor.execute(sql, val)
        result = my_cursor.fetchone()
        
        my_db.commit()

        return result

    @classmethod
    def update_status(cls, jobId, status):
        sql = "UPDATE Jobs Set status = %s WHERE job_id = %s"
        val = (status, jobId)

        my_cursor.execute(sql, val)
        my_db.commit()
