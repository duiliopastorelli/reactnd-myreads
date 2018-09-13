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
                sh 'set -x'
                sh 'npm install'
                sh 'set +x'
            }
        }
        stage('Test') {
            steps {
                sh 'set -x'
                sh 'npm test'
                sh 'set +x'
            }
        }
        stage('Run dev env') {
            steps {
                sh 'set -x'
                sh 'npm start'
                sh 'sleep 1'
                sh 'echo $! > .pidfile'
                sh 'set +x'
                input message: 'Check the site on :3000 (Click "Proceed" to continue)'
                sh 'set -x'
                sh 'kill $(cat .pidfile)'
                sh 'set +x'
            }
        }
    }
}