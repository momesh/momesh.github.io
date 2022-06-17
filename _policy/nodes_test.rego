package nodes

# tests to validate nodes.rego works as advertised

test_allow_false_by_default {
	not allow
}

test_valid_node_1 {
	allow with input as {
		"id": 1,
		"type": "node",
		"network_number": "",
		"status": "potential",
		"location": "{\"type\":\"Point\",\"coordinates\":[-91.4180962,38.8333955]}",
	}
}

test_invalid_node_2 {
	not allow with input as {
		"id": 2,
		"type": "node",
		"status": "oisdjfoisjdoif",
		"location": "{\"type\":\"Point\",\"coordinates\":[-91.4180962,38.8333955]}",
	}
}

test_invalid_node_geojson_3 {
	not allow with input as {
		"id": 3,
		"type": "node",
		"status": "active",
		"location": "{\"type\":\"Point\",__parseerror__\"coordinates\":[-91.4180962,38.8333955]}",
	}
}
