
# Nim Game

## Overview

This repository contains an implementation of the classic **Nim Game**, a popular mathematical game of strategy. In this game, two players take turns removing objects from distinct piles, and the goal is to avoid being forced to take the last object.

## Game Rules

1. The game starts with a number of piles, each containing a certain number of objects.
2. On each turn, a player must remove **at least one** object from **only one** pile.
3. The player forced to take the last object loses the game.

## Game Theory Behind Nim

The Nim Game has a rich foundation in **Game Theory**, especially in combinatorial game theory. The key to winning lies in understanding the binary representation of the pile sizes and computing the **Nim-sum** (XOR of the pile sizes). If the Nim-sum is 0 after your turn, you're in a winning position. The game is widely used to demonstrate key concepts in strategy and decision-making.

## Features

- Two-player gameplay
- Option for both manual play or automated opponent
- A graphical/text-based interface to show the current state of the game
- Ability to specify the number of piles and objects per pile at the start
- Integrated with winning strategy based on Game Theory principles

