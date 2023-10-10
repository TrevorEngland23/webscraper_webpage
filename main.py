import asyncio
from bs4 import BeautifulSoup
import requests
import json

# indicate the url you want to go to
url = 'https://www.aboutamazon.com/about-us/leadership-principles'

# send request to the url and get back a response
result = requests.get(url)

# extract the html content and store it in new variable
content = result.text

# parse the HTML content using BeautifulSoup
soup = BeautifulSoup(content, 'lxml')

# Find these HTML elements
principle_items = soup.find_all('div', class_='ListNavPageItem-title')
principle_body = soup.find_all('div', class_='ListNavPageItem-body')

# create variables for the data to live in
principle_data = {}
principle_list = []
body_list = []

# Iterate through result of principle_items
for name in principle_items:
    # get the name of the principle, return as text
    results =  name.get_text()
    # Split the results by line break
    v_split = results.split('\n')
    # append the new list to an outer list
    principle_list.append(v_split)
# print(principle_list[0][0])

# iterate through the body
for descriptions in principle_body:
    # get text version 
    principle_description = descriptions.get_text()

    # print(principle_description)
    # split the text by line breaks
    v_split_body = principle_description.split("\n")
    # append the list to an outer list
    body_list.append(v_split_body)
# print(body_list[0])

# iterate through the length of principle list
for i in range(len(principle_list)):
    # set a name variable to the first element in each list... i increments, the second index does not.
    principle_name = principle_list[i][0]
    # set a description variable to the first element in each sublist within the body list
    principle_description = body_list[i][0]
    #assign key value pairs ex. {name: description}
    principle_data[principle_name] = principle_description

# print(principle_data)
# clear the list...
principle_list.clear()
# So that it is empty to append the newly created dictionary from above
principle_list.append(principle_data)
    
# Specify the file path where you want to save the JSON file
output_file_path = "scraped_data.json"

# Write the list of dictionaries to a JSON file
with open(output_file_path, "w") as json_file:
    json.dump(principle_list, json_file, indent=4)  # Use indent for pretty formatting