-- ========================================================
-- INSERT SAMPLE CONSUMERS
-- ========================================================
INSERT INTO [db_authorization].[Consumers] (
    [key],                      
    [name],                     
    [contactPersonName],        
    [contactPersonPhoneNumber]  
)
VALUES
    (NEWID(), 'Test Consumer A', 'Alice Tester', '555-1010'),
    (NEWID(), 'Test Consumer B', 'Bob Checker', '555-2020'),
    (NEWID(), 'Test Consumer C', 'Charlie Mock', '555-3030');


-- ========================================================
-- INSERT SAMPLE SERVICES
-- ========================================================
INSERT INTO [db_authorization].[Services] ([name])
VALUES
    ('User Management Service'),
    ('Billing Service');


-- ========================================================
-- INSERT SERVICE METHODS
-- ========================================================
INSERT INTO [db_authorization].[ServiceMethods] (
    [serviceId],   
    [name]         
)
VALUES
    (1, 'GetUsers'),       
    (2, 'ProcessInvoice'); 


-- ========================================================
-- ASSOCIATE CONSUMERS WITH SERVICE METHODS
-- ========================================================
INSERT INTO [db_authorization].[ConsumerServiceMethods] (
    consumerId,       
    serviceMethodId,   
    viewErrors         
)
VALUES
    (1, 1, 1),
    (1, 2, 0),
    (2, 1, 1),
    (2, 2, 0);


-- ========================================================
-- SELECT CONSUMER DETAILS WITH SERVICE METHODS
-- ========================================================
SELECT 
    c.name AS consumerName,
    s.name AS serviceName,
    sm.name AS methodName,
    csm.viewErrors AS canViewErrors
FROM [db_authorization].[Consumers] c
INNER JOIN [db_authorization].[ConsumerServiceMethods] csm 
    ON csm.consumerId = c.id
INNER JOIN [db_authorization].[ServiceMethods] sm 
    ON sm.id = csm.serviceMethodId
INNER JOIN [db_authorization].[Services] s
    ON s.id = sm.serviceId
WHERE c.id = 1;  -- Retrieves info only for consumer with ID = 1
