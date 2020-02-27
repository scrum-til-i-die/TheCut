import os
from configparser import ConfigParser
from mysql.connector import MySQLConnection


class DbConnect():
    global my_db
    global my_cursor
    global db_config
    
########################## Configuration
    filename = '/app/secrets/config.ini'
    section = 'mysql'
    parser = ConfigParser()
    parser.read(filename)

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

##########################

    @classmethod
    def insert_new(cls, jobId, status, created_on):
        sql = "INSERT INTO Jobs (job_id, status, created_on) VALUES (%s, %s, %s)"
        val = (jobId, status, created_on)

        my_cursor.execute(sql, val)
        my_db.commit()

    @classmethod
    def update_status(cls, jobId, status):
        sql = "UPDATE Jobs Set status = %s WHERE job_id = %s"
        val = (status, jobId)

        my_cursor.execute(sql, val)
        my_db.commit()
    
