def format_errors(errors):
        """ Convert serializer errors into a simple string for frontend """
        error_message = ""
        for field, messages in errors.items():
            for msg in messages:
                error_message += f"{field} : {msg} "
        return error_message.strip()
