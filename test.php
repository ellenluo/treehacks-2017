$data = array(
        "apikey" => "y9CJUD8A", // Use your API key here
    "objectType" => "animals",
    "objectAction" => "define",
);

$jsonData = json_encode($data)

// create a new cURL resource
$ch = curl_init();

// set options, url, etc.
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
curl_setopt($ch, CURLOPT_URL, "https://api.rescuegroups.org/http/v2.json");

curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_POST, 1);

//curl_setopt($ch, CURLOPT_VERBOSE, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch);

if (curl_errno($ch)) {

    $results = curl_error($ch)

} else {

    // close cURL resource, and free up system resources
    curl_close($ch);

    $results = $result;

}

$resultsArray = json_decode($results);