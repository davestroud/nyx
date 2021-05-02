import ast
import gzip
import json
import re
import os
import sys
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LinearRegression
from sklearn.neighbors import KNeighborsRegressor
import pandas as pd
from statistics import stdev

def main():
    DIR = '/home/drew/School/Nyx_04_30_21'
    mergeddf = pd.read_csv(os.path.join(DIR,'BooksMerged2000.csv'))

def book_lin_reg(data):
    # Pre processing
    mergeddf['desc_length'] = mergeddf['description'].str.len()
    mergeddf['title_length'] = mergeddf['title'].str.len()
    mergeddf['is_series'] = np.where(mergeddf['series'].str.len() > 3, True, False)
    mergeddf['genres'] = mergeddf['genre_list'].str.split('\'')
    mergeddf['prim_genre'] = np.where((mergeddf['genres'].str[1] == 'fiction') | (mergeddf['genres'].str[1] == 'non-fiction') , mergeddf['genres'].str[3], mergeddf['genres'].str[1])
    mergeddf['publication_year'].value_counts()
    mergeddf = mergeddf[mergeddf['prim_genre'] != 'history, historical fiction, biography']
    mergeddf = mergeddf[mergeddf['num_pages'] <= 500]
    mergeddf = mergeddf[(mergeddf['publication_year'] > 2007) & (mergeddf['publication_year'] < 2018)]
    mergeddf['prim_genre'] = mergeddf['prim_genre'].fillna('No_Genre')
    mergeddf = mergeddf.fillna(0)
    one_hot = pd.get_dummies(mergeddf['prim_genre'])
    mergeddf = mergeddf.merge(one_hot, left_index = True, right_index = True)
    mergeddf = mergeddf.drop(columns = 'prim_genre')
    
    # split into x and y, remove unnecessary columns
    y = mergeddf['average_rating']
    x = mergeddf[['is_series', #'auth_avg_rating', 'auth_review_count', 'auth_ratings_count',
                  'is_ebook', 'num_pages', 'publication_day', 'publication_month',
                  'desc_length', 'title_length', 'No_Genre', 'children', 'comics, graphic', 
                  'fantasy, paranormal', 'fiction', 'mystery, thriller, crime', 
                  'non-fiction', 'poetry', 'romance', 'young-adult']]
    
    # Run model, get rmse. 
    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size = .50)
    for depth in [10, 50, 100, 500]:
        for leaf in [25, 100, 500]:
            model = RandomForestRegressor(n_estimators = 100, max_depth = depth, min_samples_leaf = leaf, n_jobs = -1)
            model.fit(X_train, y_train)
            preds = model.predict(X_test)
            mse = ((preds - y_test) ** 2).mean()
            print('rmse', depth, leaf, np.sqrt(mse))
            
    reg = LinearRegression().fit(X_train, y_train)
    preds = reg.predict(X_test)
    mse = ((preds - y_test) ** 2).mean()
    print('rmse', np.sqrt(mse))
    
    for x in range(25, 40):
        near = KNeighborsRegressor(n_neighbors = x, n_jobs = -1).fit(X_train, y_train)
        preds = near.predict(X_test)
        mse = ((preds - y_test) ** 2).mean()
        print('rmse', x, np.sqrt(mse))                
    np.sqrt(((y_test.mean() - y_test) ** 2).mean())

if __name__ == '__main__':
    main()
    