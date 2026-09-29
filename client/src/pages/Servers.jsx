import { useEffect, useState } from "react";

import api from "../services/api";

const Servers = () => {

    const [servers, setServers] = useState([]);

    const [name, setName] = useState('');
    const [hostname, setHostname] = useState('');
    const [ipAddress, setIpAddress] = useState('');

    const [editingServer, setEditingServer] = useState(null);


    useEffect(() => {

        const fetchServers = async () => {

            try {

                const response = await api.get("/servers");

                setServers(response.data.servers);
            }

            catch (error) {

                console.error("Failed to fetch servers:",error.response?.data || error.message);

            }
        };

        fetchServers();

    }, []);


    const handleAddServer = async (event) => {

        event.preventDefault();

        try {

            const response = await api.post('/servers', {
                name: name,
                hostname: hostname,
                ipAddress: ipAddress
            });

            setServers((currentServers) => {

                return [...currentServers, response.data.server];

            });

            setName("");
            setHostname("");
            setIpAddress("");

        }

        catch (error) {

            console.error('Failed to add server:', error.response?.data || error.message);

        }
    };


    const handleEdit = (server) => {

        setEditingServer(server);

        setName(server.name);
        setHostname(server.hostname);
        setIpAddress(server.ipAddress);

    };


    const handleUpdateServer = async (event) => {

        event.preventDefault();

        try {

            const response = await api.put(`/servers/${editingServer._id}`,
                {
                    name: name,
                    hostname: hostname,
                    ipAddress: ipAddress
                }
            );

            const updatedServer = response.data.server;


            setServers((currentServers) => {

                const newServers = currentServers.map((server) => {

                    if (server._id === updatedServer._id) {

                        return updatedServer;

                    }

                    return server;

                });

                return newServers;

            });


            setEditingServer(null);

            setName("");
            setHostname("");
            setIpAddress("");

        }

        catch (error) {

            console.error("Failed to update server:", error.response?.data || error.message);

        }
    };


    const handleDelete = async (serverId) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this server?");

        if (!confirmDelete) {

            return;

        }

        try {

            await api.delete(`/servers/${serverId}`);


            setServers((currentServers) => {

                const newServers = currentServers.filter((server) => {

                    return server._id !== serverId;

                });

                return newServers;

            });

        }

        catch (error) {

            console.error(
                "Failed to delete server:",
                error.response?.data || error.message
            );

        }
    };


    const handleCancelEdit = () => {

        setEditingServer(null);

        setName("");
        setHostname("");
        setIpAddress("");

    };


    return (

        <div>

            <h1>Servers</h1>


            <h2>
                {editingServer ? "Edit Server" : "Add Server"}
            </h2>


            <form
                onSubmit={editingServer ? handleUpdateServer : handleAddServer}
            >

                <div>

                    <label>
                        Server Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(event)=> {setName(event.target.value);}}
                        placeholder="Example: Office PC"
                    />

                </div>


                <div>

                    <label>
                        Hostname
                    </label>

                    <input
                        type="text"
                        value={hostname}
                        onChange={(event) => {setHostname(event.target.value)}}
                        placeholder="Example: OFFICE-PC"
                    />

                </div>


                <div>

                    <label>
                        IP Address
                    </label>

                    <input
                        type="text"
                        value={ipAddress}
                        onChange={(event) => {

                            setIpAddress(event.target.value);

                        }}
                        placeholder="Example: 192.168.1.20"
                    />

                </div>


                <button type="submit">

                    {editingServer ? "Update Server" : "Add Server"}

                </button>


                {editingServer && (

                    <button
                        type="button"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </button>

                )}

            </form>


            <h2>
                Monitored Servers
            </h2>


            {servers.length === 0 && (

                <p>
                    No servers found.
                </p>

            )}


            {servers.length > 0 && (

                <div>

                    {servers.map((server) => (

                        <div key={server._id}>

                            <h3>
                                {server.name}
                            </h3>


                            <p>
                                Hostname: {server.hostname}
                            </p>


                            <p>
                                IP Address: {server.ipAddress}
                            </p>


                            <p>
                                Status: {server.status}
                            </p>


                            <button
                                onClick={() => {

                                    handleEdit(server);

                                }}
                            >
                                Edit
                            </button>


                            <button
                                onClick={() => {

                                    handleDelete(server._id);

                                }}
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
};

export default Servers;