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
                sh 'serve -s build &'
                sh 'echo INFO: Accepting connections at http://localhost:3001'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
    }
}