using System.Collections;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace tictactoe_asp
{
    public class ServerHub : Hub
    {
        private readonly static ConcurrentDictionary<string, string> users = new();
        private readonly static List<string> waiting = [];
        private readonly static ConcurrentDictionary<string, string> games = new();
        public async Task Connect(string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user);
            users[Context.ConnectionId] = user;
            waiting.Add(user);
            await Clients.All.SendAsync("getUsers", waiting.ToArray());
        }

        public async Task ConnectToUser(string user)
        {
            if (!users.Values.Contains(user)) return;

            string other = users[Context.ConnectionId];
            games[other] = user;
            games[user] = other;

            waiting.Remove(other);
            waiting.Remove(user);



            int playerOne = new Random(DateTime.Now.Millisecond).Next(1, 3);
            int playerTwo = 3 - playerOne;

            await Clients.Group(user).SendAsync("startGame", other, playerOne);
            await Clients.Caller.SendAsync("startGame", user, playerTwo);
        }

        public async Task Move(int x, int y)
        {
            await Clients.Group(games[users[Context.ConnectionId]]).SendAsync("move", x, y);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if (users.ContainsKey(Context.ConnectionId)) users.Remove(Context.ConnectionId, out string _);
            return Task.CompletedTask;
        }
    }
}