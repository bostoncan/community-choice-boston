FROM node:4.3

# Install Terraform
RUN apt-get update && apt-get install -y unzip && \
    curl -sL "https://releases.hashicorp.com/terraform/0.8.5/terraform_0.8.5_linux_amd64.zip" \
             -o "terraform.zip" && \
    unzip terraform.zip -d terraform/ && \
    rm terraform.zip && \
    mv terraform /usr/local/terraform

ENV PATH /usr/local/terraform:$PATH
COPY ./ /src

WORKDIR /src/deploy
RUN npm install

WORKDIR /src
