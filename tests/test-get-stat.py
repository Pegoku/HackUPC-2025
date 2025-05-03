from utils.get_statistics_csv import get_stats
import pandas as pd


def csv_to_string(file_path):
    """
    Read a CSV file and convert it to a string.
    """
    with open(file_path, "r") as file:
        data = file.read()
    return data


def main():
    # Path to the CSV file
    file_path = "RevolutSimulatedData.csv"
    # Read the CSV file and convert it to a string
    data = csv_to_string(file_path)
    # Get the statistics from the CSV data
    df = get_stats(data)
    # Print the DataFrame
    print(df)


if __name__ == "__main__":
    main()
