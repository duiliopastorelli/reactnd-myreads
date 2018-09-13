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
            input{
                message "Press Ok to continue"
                parameters {
                    string(name:'username', defaultValue: 'user', description: 'Username of the user pressing Ok')
                }
            }
            steps {
                sh 'npm start'

            }
        }
    }
}