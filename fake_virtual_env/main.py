from pymongo import MongoClient
import json
# import hcl2


uri = "mongodb://localhost:27017"

try:
    client = MongoClient(uri)
    print(client)
    db = client['Create_EC2'] #資料庫名稱
    print('connected Create_EC2')

except Exception:

    print('Failed to connect to MongoDB')




def get_Data_from_mongo():
    # global server_name,ami,instance_type,disk1,extra_disks,subnet
    result = []
    #此處要依據需求重寫
    the_datas = db.terraform_datas.find({'demand': '123'})
    print(the_datas)
    for item in the_datas:
        server_name = item['server_name']
        ami = item['ami']
        instance_type = item['instance_type']
        subnet = item['subnet']
        disk1 = item['disk1']
        extra_disks = item['extra_disks']

        data = {
                "SERVER_NAME":server_name,
                "AMI":ami,
                "INSTANCE_TYPE":instance_type,
                "SUBNET":subnet,
                "DISK1":disk1,
                "EXTRA_DISKS":extra_disks
   
        }
        result.append(data)


    with open("EC2_variable.tfvars.json", "w") as file_out:
        file_out.write(json.dumps(result, indent=4))
        # print(f'{server_name},{ami},{instance_type},{subnet}')
    



get_Data_from_mongo()









