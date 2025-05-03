import csv, io

#! IMPORTANT: the response must be directly from the API, without a single modification
def clean_csv(response):
    cleaned_response_1 = "\n".join(
        line for line in response.text.splitlines() if '`' not in line)
    cleaned_response = "\n".join(cleaned_response_1.splitlines()[1:])
    return cleaned_response

def csv_to_list(cleaned_response):
    stream = io.StringIO(cleaned_response)
    reader = csv.reader(stream)
    header = next(reader)  #! NO SE USA
    data = list(reader)

    return data

def sort_info(data : list):
    # Split into month groups && convert to nums
    data_month_separated = []
    for j in range(1, 13):
        temp_list = []
        for i in data:
            i[0] = int(1)
            i[2] = float(i[2])
            i[3] = float(i[3])
            i[4] = float(i[4])
            if i[0] == j:
                temp_list.append(i)
        print(temp_list)
        data_month_separated.append(temp_list)

    # Sort each month's spendings in descending order
    data_sorted = []
    for i in data_month_separated:
        sorted_list = sorted(i, key=lambda x: x[2], reverse=True)
        data_sorted.append(sorted_list)

    return data_sorted


def parseCSV(response):
    cleaned_response = clean_csv(response)
    data = csv_to_list(cleaned_response)
    data_sorted = sort_info(data)

    return data_sorted


