package nodes

import future.keywords.in

default allow = false

allowed_types := {"hub", "node"}

allowed_statuses := {"active", "hidden"}

# TODO: make sure network_number is valid and unique if present

node_schema_valid {
	input.type in allowed_types
	input.status in allowed_statuses

	# TODO: check node number is unique in set of all nodes?
	input.id > 0
}

node_location_geojson_valid {
	# location is a marshalled geojson point
	gj := json.unmarshal(input.location)
	gj.type == "Point"

	# make sure coordinates have 2 fields only
	count(gj.coordinates) == 2

	long := gj.coordinates[0]
	lat := gj.coordinates[1]
	long <= 180.0
	long >= -180.0
	lat <= 90.0
	lat >= -90.0
}

allow {
	node_schema_valid
	node_location_geojson_valid
}
