-- ========================================================
-- INSERT SAMPLE CONSUMERS
-- ========================================================
INSERT INTO [db_authorization].[Consumers] (
    [key],                     -- Unique identifier for the consumer
    [name],                    -- Consumer name
    [contactPersonName],       -- Name of the contact person
    [contactPersonPhoneNumber] -- Phone number of contact person
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
    [serviceId],  -- FK referencing Services.id
    [name]        -- Method name for the service
)
VALUES
    (1, 'GetUsers'),       -- WARNING: Hardcoded IDs! Better to SELECT the service ID dynamically.
    (2, 'ProcessInvoice'); -- Could break if service IDs are not 1 and 2.

-- ========================================================
-- ASSOCIATE CONSUMERS WITH SERVICE METHODS
-- ========================================================
INSERT INTO [db_authorization].[ConsumerServiceMethods] (
    consumerId,       -- FK referencing Consumers.id
    serviceMethodId,  -- FK referencing ServiceMethods.id
    viewErrors        -- Permission flag
)
VALUES
    (1, 1, 1),
    (1, 2, 0),
    (2, 1, 1),
    (2, 2, 0);
-- NOTE: Using hardcoded IDs again. If the Consumers or ServiceMethods IDs are auto-generated, this may not match.

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
