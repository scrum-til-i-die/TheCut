import api from "./api";

export default {
    // Posts video to endpoint on AWS (and potentially returns uuid in response?)
    uploadVideo(data) {
        return api.post(
            '/uploadfile', 
            data,
        )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    // Retrieves results from API for specific uuid
    getResults(id) {
        return api.get(
            '/status',
            {
                params: {
                  jobId: id
                }
            }
        )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
