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
        stage('Build') {
            steps {
                sh 'npm run-script build'
            }
        }
    }
}