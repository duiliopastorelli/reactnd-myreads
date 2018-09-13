pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run dev env') {
            steps {
                sh 'npm start &'
                input message: 'Check the site on :3000 (Click "Proceed" to continue)'
            }
        }
    }
}