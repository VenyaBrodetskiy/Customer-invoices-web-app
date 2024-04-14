#!/bin/bash
set -e

# Start SQL Server
/opt/mssql/bin/sqlservr &

# Wait for SQL Server to start
echo "Waiting for SQL Server to start..."
counter=0
until /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'StrongPassw0rd' -Q 'SELECT 1;' > /dev/null 2>&1
do
  sleep 1
  counter=$((counter + 1))
  if [ $counter -gt 120 ]
  then
    echo "SQL Server did not start within 120 seconds. Exiting."
    exit 1
  fi
done
echo "SQL Server has started."

# Run the SQL script
/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'StrongPassw0rd' -d master -i /create_db.sql

wait $!
