## Introduction

This document has the basic instructions. Basically you will need to get your Google API accounts setup, following: 

* https://cloud.google.com/speech/docs/getting-started#set_up_your_project

Then you will have to set the service to work as a service, i.e. to enable you to use file-based keys and server authentication. See the following page

*  https://cloud.google.com/speech/docs/common/auth#set_up_a_service_account 

## Get your authentication key

Using the JSON file that you have exported using the above tools.

* gcloud auth activate-service-account --key-file=service-account-key-file

Then, obtain your token: 

* gcloud auth print-access-token

## Setup your query/request file

* Notice that my file is in portuguese. If you want to use other languages, please refer to this section https://cloud.google.com/speech/docs/best-practices#language_support

```
{
  "config": {
      "encoding":"FLAC",
      "language_code":"pt-BR",
      "sample_rate": 16000
  },
  "audio": {
      "uri":"gs://marcio-api/novo-mono.flac"
  }
}
  
```

curl -s -k -H "Content-Type: application/json" \
    -H "Authorization: Bearer access_token" \
    https://speech.googleapis.com/v1beta1/speech:syncrecognize \
    -d @sync-request.json

## FLAC audio requirements 

References: 

https://cloud.google.com/speech/docs/best-practices

### Sample rate: 16000 is recommeneded 

You have to doublecheck your audio file, the conditions such as: 

* Mono
* Sample rate 

I have used a test file produced with a local Mac Software, Screenflow, therefore I had to move the file to my linux and use avconv to lower the sample rate: 

* avconv -i teste.aiff -ar 16000 novo.flac

However, this have not worked. 

### FLAC fixing to mono

* avconv -i teste.aiff -ar 16000 -ac 1 novo.flac
* Reference https://trac.ffmpeg.org/wiki/AudioChannelManipulation 

## Other notes

* You may also see yourself in trouble if you use larger flac files. Their service may ask you to work in asynchronous mode — please patch this article if you find how to work with that.

