import React, {Component} from 'react';

const url = 'https://randomuser.me/api/?results=50&nat=us';

async function callApiAsyncAwait(url, onSuccess, onError) {
  try {
    const res = await fetch(url); //Need await for each async function
    const json = await res.json();

    if (res['status'] === 200) {
      onSuccess(json['results']);
    } else {
      throw Error(json['error']);
    }
  } catch (error) {
    onError(error);
  }
}

const fetchUsers = async () => {
  const response = await fetch(url);
  const {results} = await response.json(); //deconstruct of json['results']
  console.log(results);
  return results.map(processContact);
};

const processContact = contact => ({
  name: `${contact.name.first} ${contact.name.last}`,
  phone: contact.phone,
  key: contact.id.value,
});

const login = async (username, password) => {
  const response = await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({email: username, password: password}),
  });
  const json = await response.json()
  console.log(json);
  if (!response.ok) {
     throw Error(json['error'])
  }
  return json['token']
};

export {fetchUsers, login}
