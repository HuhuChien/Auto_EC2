from pymongo import MongoClient
import json,sys

# import hcl2


uri = "mongodb://localhost:27017"

try:
    client = MongoClient(uri)
    print(client)
    db = client['Create_EC2'] #資料庫名稱
    print('connected MongoDB_Create_EC2')

except Exception:

    print('Failed to connect to MongoDB')




def get_Data_from_mongo():
    result = []
    #目標:在Jenkins頁面輸入需求單單號後，單號會寫入此main.py檔案
    the_datas = db.terraform_datas.find({'demand': sys.argv[1]})
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

    



get_Data_from_mongo()









