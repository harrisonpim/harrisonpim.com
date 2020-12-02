---
layout: post
title: "Fast image similarity with locality-sensitive hashing"
excerpt: Approximate nearest neighbours in elasticsearch
---

## The problem
In previous posts I've described how we use neural networks to extract descriptive feature vectors from our images, and ways that those feature vectors can be compared to give us a measure of images' similarity.

It's common to use the cosine distance between two vectors as a measure of their similarity. While it gives good results, cosine distance to calculate, and 

At Wellcome Collection, our images come with lots of context - titles, descriptions, notes, subjects, etc. We use elasticsearch to store that contextual data, and elasticsearch's query syntax allows us to ask questions of that data in all sorts of interesting ways.

For a while, we've been using a separate service to compute image similarity - it's fast, but it's hard to keep data consistent across multiple services 

We want to bring our images' features into elasticsearch, and make them comparable with the same speed and precision as the external alternatives.

## Clustering

We can measure the distance from every image to every other in feature-space, and use those distances to find groups, or clusters. Because proximity in feature-space represents image similarity, images in the same cluster should all share some visual traits.

## Hashing

Splitting feature vectors into sections

clustering within sections

## Superpowered search

In addition to having a single, fast, reliable way of querying our image data, we can now ask new questions. 

For example, we can combine the visual information about style and content in LSH hashes, and the contextual information in titles and descriptions with a query like 'show me pictures of dogs which look like this picture of a house'.

Here's a query image which we'll use as the source of visual information.

We can use elasticsearch's expressive JSON query language to combine this with additional query text: `dog`

The results of the query are shown below

We can change the query image and the query text to get a sense of how the two styles of information interact.


