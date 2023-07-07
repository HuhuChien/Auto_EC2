provider "aws" {
  region = "us-east-1"
  access_key = "AKIAU4RRRY64OEO4XJR3"
  secret_key = "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"
}




variable SERVER_NAME {
}
variable AMI {
}
variable INSTANCE_TYPE {
}
variable SUBNET {
}

variable DISK1 {
}


variable EXTRA_DISKS {
  description = "extra_disks"
  type = list(map(string)) //list(string) //list(map(string)) //set(string) 

}



resource "aws_instance" "YC_EC2" {
  for_each = var.EXTRA_DISKS
  ami           = var.AMI
  instance_type = var.INSTANCE_TYPE
  subnet_id     = var.SUBNET
  
  root_block_device {
      volume_type = "gp3"
      volume_size = each.value.rootdisk.volume_size
      tags = each.value.rootdisk.tags
    }
  ebs_block_device {
      volume_type = each.value.rootdisk.volume_type
      volume_size = each.value.EC2_disk
      tags = each.value.rootdisk.tags
    }
  

  key_name = "ohfkey"
  tags = {
    Name = var.SERVER_NAME
  }



}