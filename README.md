# Blooming : Image Style Transfer Website

<b>'Blooming 🌼'</b> is a <U><i>website to change the image style to the style you want</i></U>.

Given one content image and one style image, we <b>create a new, target image which should contain our desired content and style components</b>.

An example is shown below, where the content image is of a woman, and the style image is of Starry night. The generated target image still contains the woman but is stylized with the colors and textures of the style image.
![example](https://user-images.githubusercontent.com/44187125/105284787-82d4d200-5bf6-11eb-9b5e-51e74c648f91.JPG)
![GIF 2021-02-03 오후 4-49-34](https://user-images.githubusercontent.com/50094131/106714913-d6f0a500-663f-11eb-9637-f1baab736498.gif)

## Features
![features](https://user-images.githubusercontent.com/43427380/106714504-487c2380-663f-11eb-9b80-dc6bd76babad.PNG)


## Tech Stack

```
Backend: Flask
Frontend: React
Middleware: Gunicorn
Nginx
Docker
Database: MySQL
```


|         Frontend         |      Backend      |         etc          |
| :----------------------: | :---------------: | :------------------: |
| ![react](https://img.shields.io/badge/react-v16.14.0-9cf?logo=react) ![Javascript](https://img.shields.io/badge/javascript-ES6+-yellow?logo=javascript) ![Bootstrap](https://img.shields.io/badge/bootstrap-v1.4.3-9cf?logo=bootstrap) ![axios](https://img.shields.io/badge/axios-v0.21.1-9cf?color=purple) ![Styled-components](https://img.shields.io/badge/styled_components-v5.2.1-DB7093?logo=styled-components) | ![Flask](https://img.shields.io/badge/flask-v1.1.2-green?logo=flask) ![Python](https://img.shields.io/badge/python-v3.8.6-skyblue?logo=python) ![Gunicorn](https://img.shields.io/badge/gunicorn-v20.0.4-darkgreen?logo=gunicorn) ![MySQL](https://img.shields.io/badge/mysql-v4.2.11-blue?logo=mysql) | ![Docker](https://img.shields.io/badge/docker-v20.10.2-blue?logo=docker) ![Nginx](https://img.shields.io/badge/Nginx-v1.14.0-brightgreen?logo=nginx) ![github](https://img.shields.io/badge/github-gray?logo=github) ![VScode](https://img.shields.io/badge/VScode-v1.52.1-blue?logo=visual-studio-code) ![Google Cloud Platform](https://img.shields.io/badge/Google_Cloud_Platform-VM_instance-red?logo=gcp) ![AWS](https://img.shields.io/badge/AWS-EC2_instance-orange?logo=aws)  |

### Used Model
[Image Style Transfer model](https://github.com/magenta/magenta/tree/master/magenta/models/arbitrary_image_stylization) from Tensorflow-hub
 
<br />

### System Architecture

![시스템아키텍쳐-최종](https://user-images.githubusercontent.com/44187125/106837480-e9b9b700-66dd-11eb-91c8-498850709e1a.png)

<br />

## Initialization

- clone the repository

    ```
    $ git clone https://github.com/SiliconValleyInternship-Lambda/ImageStyleTransfer.git
    $ cd ImageStyleTransfer
    ```

### 1. Backend: Flask 🌶
- Install required pip packages

    ```
    $ cd flask_backend
    $ pip install -r requirements.txt
    ```
    
    #### pip packages
    ```
    flask
    jsonify
    requests
    tensorflow>=2.0.0
    tensorflow-hub
    pillow
    pymysql
    ```

- Flask run

    ```
    $ flask run
    ```

### 2. Frontend: React ❄

- Install npm packages

  ```
  $ cd react_frontend
  $ npm install
  ```
  
  #### npm packages (libraries)
  ```
  "@emotion/core"
  "@emotion/react"
  "@emotion/styled"
  "@material-ui/core"
  "@material-ui/icons"
  "@testing-library/jest-dom"
  "@testing-library/react"
  "@testing-library/user-event"
  "axios"
  "bootstrap"
  "material-ui-icons"
  "react",
  "react-bootstrap"
  "react-dom"
  "react-dropzone"
  "react-grid-gallery"
  "react-notifications"
  "react-notifications-component"
  "react-router-dom"
  "react-scripts"
  "react-spinners"
  "semantic-ui-css"
  "semantic-ui-react"
  "styled-components"
  "web-vitals"
  ```

- build and run

    ```
    $ npm run build
    $ npm start
    ```


### 3. Docker 🐳

- docker compose build and up

```
$ cd ImageStyleTransfer
$ docker-compose up --build
```


1) **build the docker image**

    ```
    $ docker-compose build
    ```

2) **docker compose run**

    ```
    $ docker-compose up
    ```

    **Note:** 

    docker compose run with daemon mode

    ```
    $ docker-compose up -d
    ```

#### Nginx

- **Frontend**

    ```
    http://localhost:80
    ```

- **Backend**

    ```
    http://localhost:8000
    ```

#### Flask Python application

```
http://localhost:5000
```

#### React application

```
http://localhost:3000
```


### 4. Database: MySQL 🗂

```
http://host_ip:3306
```

<br />


## Author
- 2021 Silicon Valley Winter Online Internship Program - Team L 'Lambda'


| Boyun Seo | Soyeong Kim | Soobin Jung | Hakjun Moon |
|:---:|:---:|:---:|:---:|
| [**@boyuuuun**](https://github.com/boyuuuun)| [**@kimsoyeong**](https://github.com/kimsoyeong) | [**@SoobinJung1013**](https://github.com/SoobinJung1013) | [**@MHJworld**](https://github.com/MHJworld) 
