# probable-bassoon

## Prerequisites - 
Node version v15.14.0 is required \
Run 'npm i' after cloning the repository to local \
Run 'npm start' to start the application \
Run 'npm test' to run the test suite \
.env file should be present with MONGO_DB_URI

## API's: 

1. To get the response - \
Type of the request - POST \
Request URL - http://localhost:3000/records \
Request Body - {\
        "startDate": "2016-01-26", \
        "endDate": "2018-02-02", \
        "minCount": 2700, \
        "maxCount": 3000 \
}\
All the above params are mandatory. \
Sample Response - 
<pre>
{ 
    "code":0, 
    "msg":"Success", 
    "records":[ 
                { 
                    "key":"TAKwGc6Jr4i8Z487", 
                    "createdAt":"2017-01-28T01:22:14.398Z", 
                    "totalCount":2800 
                }, 
                { 
                    "key":"NAeQ8eX7e5TEg7oH", 
                    "createdAt":"2017-01-27T08:19:14.135Z", 
                    "totalCount":2900 
                } 
            ] 
}
</pre>