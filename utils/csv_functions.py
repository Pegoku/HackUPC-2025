import csv, io


#! IMPORTANT: the response must be directly from the API, without a single modification
def clean_csv(response):
    print(response)
    cleaned_response_1 = "\n".join(
        line for line in response.splitlines() if "`" not in line
    )
    cleaned_response = "\n".join(cleaned_response_1.splitlines()[1:])
    return cleaned_response


def csv_to_list(cleaned_response):
    stream = io.StringIO(cleaned_response)
    reader = csv.reader(stream)
    # header = next(reader)  #! NO SE USA
    # print(header)
    data = list(reader)

    return data


def parseCSV(response):
    cleaned_response = clean_csv(response)
    data = csv_to_list(cleaned_response)
    return data
