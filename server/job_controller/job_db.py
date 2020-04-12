import os
import time
import datetime
from configparser import ConfigParser
from mysql.connector import MySQLConnection, Error, pooling

class DbConnect():
    global db_pool
    filename = '/app/secrets/config.ini'
    section = 'mysql'
    parser = ConfigParser()
    parser.read(filename)

    if not (os.path.exists(filename)):
        raise Exception ('{0} cannot be acessed because it does not exist.'.format(filename))

    db_config = {}
    if parser.has_section(section):
        items = parser.items(section)
        for item in items:
            db_config[item[0]] = item[1]
    else:
        raise Exception('{0} not found in the {1} file'.format(section, filename))

    db_pool = pooling.MySQLConnectionPool(pool_name="pynative_pool",
                                                            pool_size=5,
                                                            pool_reset_session=True,
                                                            **db_config)

    @classmethod
    def create_job(cls, jobId, status, created_on):
        db = cls.__get_db_connection()
        try:
            sql = "INSERT INTO Jobs (job_id, status, created_on) VALUES (%s, %s, %s)"
            val = (jobId, status, created_on)

            cursor = db.cursor()
            cursor.execute(sql, val)
            db.commit()
        except Error as e:
            # log some error
            print ("create_job error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()
        
    @classmethod 
    def complete_job(cls, jobId, status, finished_on, movie_id = None, error= None):
        db = cls.__get_db_connection()
        try:
            sql = "UPDATE Jobs Set status = %s, finished_on = %s, movie_id = %s, error_message = %s WHERE job_id = %s"
            val = (status, finished_on, movie_id, error, jobId)
            
            cursor = db.cursor()
            cursor.execute(sql, val)
            db.commit()
        except Error as e:
            # log some error
            print ("complete_job error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()    
        
    @classmethod
    def get_job(cls, jobId):
        db = cls.__get_db_connection()
        try:
            sql = ('SELECT job_id, status, movie_id, error_message, created_on, finished_on '
                    'FROM Jobs WHERE job_id = %s')
            val = (jobId,)

            cursor = db.cursor()
            cursor.execute(sql, val)
            job = cursor.fetchone()

            if (job == None):
                return None
        
            result = {
                "job_id": job[0],
                "status": job[1],
                "movie_id": job[2],
                "error": job[3],
                "created_on": job[4],
                "finished_on": job[5]
            }

            return result
        except Error as e:
            # log some error
            print ("get_job error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()

    @classmethod
    def update_status(cls, jobId, status):
        db = cls.__get_db_connection()
        try:
            sql = "UPDATE Jobs Set status = %s WHERE job_id = %s"
            val = (status, jobId)

            cursor = db.cursor()
            cursor.execute(sql, val)
            db.commit()
        except Error as e:
            # log some error
            print ("error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()

    @classmethod
    def get_all_jobid(cls):
        db = cls.__get_db_connection()
        try:
            sql = ('SELECT job_id '
                    'FROM Jobs')
            
            cursor = db.cursor()
            cursor.execute(sql)
            results = cursor.fetchall()

            jobIds = []
            for result in results:
                jobIds.append(str(result[0]))

            return jobIds
        except Error as e:
            # log error
            print("Error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()

    @classmethod
    def create_moviemetadata(cls, movieId, title, posterPath, genres, overview, actors, runtime):
        db = cls.__get_db_connection()
        try:
            sql = ('INSERT INTO Movie_Metadata '
                    '(movie_id, title, poster_path, genres, overview, actors, runtime, last_requested) '
                    'VALUES (%s, %s, %s, %s, %s, %s, %s, %s)')
            lastRequested = str(datetime.datetime.now())
            val = (movieId, title, posterPath, genres, overview, actors, runtime, lastRequested)

            cursor = db.cursor()
            cursor.execute(sql, val)
            db.commit()
        except Error as e:
            # log some error
            print (e)
            return False
        finally:
            if db.is_connected():
                cursor.close()
                db.close()
                return True

    @classmethod
    def create_moviemetadata_fromobj(cls, movie_metadata):
        movieId = movie_metadata['movie_id']
        title = movie_metadata['title']
        posterPath = movie_metadata['poster_path']
        genres = movie_metadata['genres']
        overview = movie_metadata['overview']
        actors = movie_metadata['actors']
        runtime = movie_metadata['runtime']

        return cls.create_moviemetadata(movieId, title, posterPath, genres, overview, actors, runtime)

    @classmethod
    def get_moviemetadata(cls, movieId):
        db = cls.__get_db_connection()
        try:
            sql = ('SELECT movie_id, title, poster_path, genres, overview, actors, runtime '
                    'FROM Movie_Metadata '
                    'WHERE movie_id = %s')
            val = (movieId,)

            cursor = db.cursor()
            cursor.execute(sql, val)
            movie_metadata = cursor.fetchone()

            if (movie_metadata == None):
                return None

            movie_metadata = {
                'movie_id': movie_metadata[0],
                'title': movie_metadata[1],
                'poster_path': movie_metadata[2],
                'genres': movie_metadata[3],
                'overview': movie_metadata[4],
                'actors': movie_metadata[5],
                'runtime': movie_metadata[6]
            }

            print(cls.update_moviemetadata_ts(movieId))

            return movie_metadata
        except Error as e:
            # log some error
            print (e)
        finally:
            if db.is_connected():
                cursor.close()
                db.close()

    @classmethod
    def get_all_moviemetadata_id(cls):
        db = cls.__get_db_connection()
        try:
            sql = ('SELECT movie_id '
                    'FROM Movie_Metadata')
            
            cursor = db.cursor()
            cursor.execute(sql)
            results = cursor.fetchall()

            movieIds = []
            for result in results:
                movieIds.append(str(result[0]))

            return movieIds
        except Error as e:
            # log error
            print("Error")
        finally:
            if db.is_connected():
                cursor.close()
                db.close()

    @classmethod
    def remove_moviemetadata(cls, movieId):
        db = cls.__get_db_connection()
        try:
            sql = ('DELETE FROM Movie_Metadata '
                    'WHERE movie_id = %s')
            val = (movieId,)

            cursor = db.cursor()
            cursor.execute(sql, val)
            db.commit()
        except Error as e:
            # log some error
            print (e)
            return False
        finally:
            if db.is_connected():
                cursor.close()
                db.close()
                return True

    @classmethod
    def update_moviemetadata_ts(cls, movieId):
        db = cls.__get_db_connection()
        try:
            sql = ('UPDATE Movie_Metadata '
                    'SET last_requested = %s '
                    'WHERE movie_id = %s')
            lastRequested = str(datetime.datetime.now())
            val = (lastRequested, movieId)

            cursor = db.cursor()
            cursor.execute(sql, val)
            db.commit()
        except Error as e:
            # log some error
            print (e)
            return False
        finally:
            if db.is_connected():
                cursor.close()
                db.close()
                return True

    @classmethod
    def __get_db_connection(cls):
        while(True):
            try:
                db_connect = db_pool.get_connection()
                if (db_connect.is_connected() == False):
                    raise Error
            except Error as e:
                time.sleep(1)
            
            if (db_connect.is_connected() == True):
                    break

        return db_connect
