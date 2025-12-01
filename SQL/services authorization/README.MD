# This database manages API access for consumers. 

- **Consumers**: clients using the services  
- **Services**: available system services  
- **ServiceMethods**: specific actions within a service  
- **ConsumerServiceMethods**: links consumers to methods and sets permissions (e.g., view errors)

# Diagram to illustrate the relationships:
```
+----------------+       +----------------+       +--------------------+
|   Consumers    |       |    Services    |       |   ServiceMethods   |
+----------------+       +----------------+       +--------------------+
| id (PK)        |<---+  | id (PK)        |<---+  | id (PK)           |
| key            |    |  | name           |    |  | serviceId (FK)    |
| name           |    |  +----------------+    |  | name              |
| contactName    |    |                        |  +--------------------+
| contactPhone   |    |                        |
+----------------+    |                        |
                      |                        |
                      |                        |
                      |                        |
                      v                        v

                      +------------------------+     
                      | ConsumerServiceMethods |     
                      +------------------------+     
                      | consumerId (FK)        |     
                      | serviceMethodId (FK)   |     
                      | viewErrors             |     
                      +------------------------+
```
