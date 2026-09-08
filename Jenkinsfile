pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/yourusername/product-catalogue.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Product Catalogue'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Product Catalogue'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Product Catalogue deployed successfully'
            }
        }
    }
}
