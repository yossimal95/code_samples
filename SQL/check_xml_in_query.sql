-- SQL ... you can check the XML type field (or convert varchar/text type field to XML), then add it to the query..
where someId = 1111
and convert(xml, data).value('(//xmlRootItem/xmlRootChildItem)[1]', 'varchar(max)') like '8' -- '[1]' - check only the first


or convert(xml, someTable.someField).exist('//xmlRootItem/xmlRootChildItem[text()=sql:column("someOtherField")]') = 1 -- check if one of the items == some other SQL field


or convert(xml, someTable.someField).exist('//ArrayOfPerxmlRootItemiod/xmlRootChildItem[text()="someText"]') = 1 -- check if one of the items == some text

-- Also consider checking it using: WHERE xmlField LIKE '%some text%' -- <xml><element>some text</element></xml>..
