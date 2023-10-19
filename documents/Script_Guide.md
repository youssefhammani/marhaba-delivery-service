## Scripts

This document provides an overview of the scripts used in our project and their structure.

### Directory Structure

- **scripts/**: Main directory for project scripts.
- **bash/**: Bash scripts.
- **nodejs/**: Node.js scripts.
- **python/**: Python scripts.
- **README.md**: This documentation file.

### Bash Scripts

#### `generate-env-example.sh`

1. **Purpose :**

   - This Bash script creates an `.env.example` file with descriptions for environment variables. The generated file serves as a template for configuring your application by specifying the necessary environment variables.

2. **Usage :**

   - Execute the script with the following command:
   
        ```bash
        ./bash/./generate-env-example.sh
        ```
***`Note:`*** If you encounter a permission error when trying to run the script, you can [click here](#making-thes-cript-executable) to fix it.

#### ***Making the Script Executable***

  - Before running the script, make sure it's executable. You can grant execution permission using the chmod command as follows:

    ```bash
    chmod +x generate-env-example.sh
    ```
> You can also check the script's current permissions by running `ls -l generate-env-example.sh`.