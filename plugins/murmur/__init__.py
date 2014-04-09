# Plugin metadata
NAME = 'Mumble Server'
TYPE = 'plugin'
ICON = 'gen-bubbles'
DESCRIPTION = 'Host your own Mumble server'
LONG_DESCRIPTION = ('Murmur is the server application for Mumble, an open '
                    'source Voice-over-IP (VoIP) client. This plugin hosts the '
                    'murmur server and lets you manage the server via the '
                    'Mumb1e Admin Plugin.')
CATEGORIES = [
    {
        "primary": "Communication",
        "secondary": ["VoIP", "Voice-over-IP"]
    }
]
VERSION = '1'

AUTHOR = 'Heiner Tholen'
HOMEPAGE = 'http://github.com/heinzK1X'
APP_AUTHOR = "The Mumble Community"
APP_HOMEPAGE = "http://mumble.sourceforge.net"
LOGO = True

SERVICES = [
    {
        "name": "VoIP Server",
        "binary": "murmurd",
        "ports": [('tcp', '64738'), ('udp', '64738')]
    }
]

# Plugin parameters
MODULES = ['main']
PLATFORMS = ['any']
DEPENDENCIES = {
    "any": [
        {
            "type": "app",
            "name": "Murmur",
            "package": "murmur",
            "binary": "murmurd"
        },
    ]
}
GENERATION = 1