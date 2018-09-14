pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3001:3000'
        }
    }
    stages {
        stage('Environment setup') {
            steps {
                sh 'npm install'
                sh 'npm install -g serve'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build'
            }
        }
        stage('Run') {
            steps {
                sh 'serve -s build'
            }
        }
    }
}