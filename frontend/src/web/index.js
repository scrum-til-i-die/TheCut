import api from "./api";

export default {
    // Posts video to endpoint on AWS (and potentially returns uuid in response?)
    uploadVideo(data) {
        return api.post(
            '/uploadfile', 
            data,
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    // Retrieves results from API for specific uuid
    getResults(id) {
        return api.get(
            '/getstatus',
            id
        )
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
