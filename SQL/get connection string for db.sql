select
    'data source=' + '@@@_ADD_SERVER NAME__@@@' +
    ';initial catalog=' + db_name() + ';trusted_connection=true'  
    as ConnectionString
from sys.server_principals
where name = suser_name()
