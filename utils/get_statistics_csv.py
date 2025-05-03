import pandas as pd
from utils.csv_functions import csv_to_list, clean_csv

columns_names = [
    "Type",
    "Product",
    "Started Date",
    "Completed Date",
    "Description",
    "Amount",
    "Currency",
    "State",
    "Balance",
    "Month",
    "Category",
]


def get_stats(data):

    # Clean de data, must be a string but in csv format
    cleaned_data = csv_to_list(clean_csv(data))

    print("Data cleaned and converted to list")
    print(cleaned_data)

    # Convierte la lista de listas en un DataFrame
    df = pd.DataFrame(
        cleaned_data, columns=columns_names
    )  # Usa la primera fila como encabezados

    print("Data cleaned and converted to DataFrame")
    # print(df)

    # Elimina las columnas no deseadas
    df = df.drop(
        columns=[
            "Type",
            "Started Date",
            "Completed Date",
            "Currency",
            "Product",
            "State",
            "Balance",
        ]
    )

    # Convierte la columna "Amount" a tipo numérico y luego a valores positivos
    df["Amount"] = pd.to_numeric(df["Amount"], errors="coerce").abs()

    print("Columns removed and Amount values converted to positive")

    # Cambia el nombre de la columna "Description" a "Comercio"
    df = df.rename(columns={"Description": "Comercio"})

    # Agrupa por "Comercio" y calcula las nuevas columnas, incluyendo la categoría
    grouped_df = (
        df.groupby(["Comercio", "Category"])
        .agg(
            frequency=("Comercio", "size"),
            avg_amount=("Amount", "mean"),
            total_amount=("Amount", "sum"),
        )
        .reset_index()
    )

    # Redondea avg_amount a dos decimales
    grouped_df["avg_amount"] = grouped_df["avg_amount"].round(2)

    return grouped_df
