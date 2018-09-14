pipeline {
    agent {
        docker {
            image 'node:alpine'
            args '-p 3001:5000'
        }
    }
    stages {
        stage('Environment setup') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build'
            }
        }
    }
}