
variable SERVER_NAME {
}
variable AMI {
}
variable INSTANCE_TYPE {
}
variable SUBNET {
}


resource "aws_instance" "web" {
  ami           = var.AMI
  instance_type = var.INSTANCE_TYPE
  tags = {
    Name = var.SERVER_NAME
  }



}