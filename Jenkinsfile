pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3010:3000'
        }
    }
    stages {
        stage('Environment setup') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run dev env') {
            steps {
                sh 'npm start &'
                input message: 'Check the site on :3010 (Click "Proceed" to continue)'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build'
                input message: 'Check the Build (Click "Proceed" to continue)'
            }
        }
    }
}