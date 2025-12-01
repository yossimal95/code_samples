-- Create schema for authorization-related tables
CREATE SCHEMA db_authorization


-- Table storing consumers (clients/applications)
CREATE TABLE [db_authorization].[Consumers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[key] [uniqueidentifier] NOT NULL,
	[name] [varchar](100) NOT NULL, 
	[contactPersonName] [varchar](100) NULL, 
	[contactPersonPhoneNumber] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


-- Table storing registered services
CREATE TABLE [db_authorization].[Services](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL, 
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


-- Table storing methods (API endpoints) belonging to services
CREATE TABLE [db_authorization].[ServiceMethods](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[serviceId] [int] NOT NULL,  -- FIXED: changed from NULL to NOT NULL
	[name] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [db_authorization].[ServiceMethods]  WITH CHECK ADD  CONSTRAINT [FK_ServiceMethods_Services] FOREIGN KEY([serviceId])
REFERENCES [db_authorization].[Services] ([id])


-- Table mapping consumers to service methods (permissions table)
CREATE TABLE [db_authorization].[ConsumerServiceMethods](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[consumerId] [int] NOT NULL,
	[serviceMethodId] [int] NOT NULL,
	[viewErrors] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]


ALTER TABLE [db_authorization].[ConsumerServiceMethods]  WITH CHECK ADD  CONSTRAINT [FK_ConsumerServiceMethods_Consumers] FOREIGN KEY([consumerId])
REFERENCES [db_authorization].[Consumers] ([id])


ALTER TABLE [db_authorization].[ConsumerServiceMethods] CHECK CONSTRAINT [FK_ConsumerServiceMethods_Consumers]

ALTER TABLE [db_authorization].[ConsumerServiceMethods]  WITH CHECK ADD  CONSTRAINT [FK_ConsumerServiceMethods_ServiceMethods] FOREIGN KEY([serviceMethodId])
REFERENCES [db_authorization].[ServiceMethods] ([id])

ALTER TABLE [db_authorization].[ConsumerServiceMethods] CHECK CONSTRAINT [FK_ConsumerServiceMethods_ServiceMethods]
